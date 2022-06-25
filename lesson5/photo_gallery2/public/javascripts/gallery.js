class Model {
  constructor() {
    this.domain = 'http://localhost:3000/';
    this.photos;
  }

  async getPhotos() {
    this.photos = await fetch(this.domain + 'photos')
                            .then(res => res.json());
  }

  async getComments(id) {
    this.comments = await fetch(this.domain + `comments?photo_id=${id}`)
                              .then(res => res.json());
  }
}

class View {
  constructor() {
    this.templates = {};
    this.slides = $('#slides');
    this.currentSlide; 
    this.header = $('header');
    this.comments = $('#comments ul');
    this.compileTemplates();
    this.registerPartial($('#photo_comment')[0]);
  }

  renderPhotos(photos) {
    this.slides.append(this.templates['photos']({ photos }));
    this.figures = $('figure[data-id]');
  }

  renderPhotoInfo(photo) {
    this.header.html('');
    this.header.append(this.templates['photo_information'](photo));
  }

  renderComments(comments) {
    this.comments.html('');
    this.comments.append(this.templates['photo_comments']({ comments }));
  }

  compileTemplates() {
    let templates = $('[type="text/x-handlebars"]');
    [...templates].forEach(templ => {
      this.templates[templ.id] = Handlebars.compile(templ.innerHTML);
    });
  }

  registerPartial(templ) {
    Handlebars.registerPartial(templ.id, templ.innerHTML);
  }

  getCurrentSlide() {
    let slide = [...this.figures].filter(fig => {
      return $(fig).css('display') === 'block';
    })[0];
    this.currentSlide = $(slide);
  }

  prev(handler) {
    $('main').on('click', 'a.prev', e => {
      e.preventDefault();
      this.getCurrentSlide();
      let nextSlide;
      if (this.currentSlide.prev().length < 1) {
        nextSlide = $(this.figures.slice(-1)[0]);
      } else {
        nextSlide = this.currentSlide.prev();
      }
      
      this.currentSlide.fadeOut('slow');
      nextSlide.fadeIn('slow');
      handler(nextSlide.data('id'));
    });
  }

  next(handler) {
    $('main').on('click', 'a.next', e => {
      e.preventDefault();
      this.getCurrentSlide();
      let nextSlide;
      if (this.currentSlide.next().length < 1) {
        nextSlide = $(this.figures[0]);
      } else {
        nextSlide = this.currentSlide.next();
      }
      
      this.currentSlide.fadeOut('slow');
      nextSlide.fadeIn('slow');
      handler(nextSlide.data('id'));
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.loadPage(1);
    this.view.prev(this.handlePrev);
    this.view.next(this.handleNext);
  }

  loadPage = async (id) => {
    await this.model.getPhotos();
    this.view.renderPhotos(this.model.photos);
    let photo = this.model.photos[id - 1];
    this.view.renderPhotoInfo(photo);
    await this.model.getComments(photo.id);
    this.view.renderComments(this.model.comments);
  }

  handlePrev = (id) => {
    this.loadPage(id);
  }

  handleNext = (id) => {
    this.loadPage(id);
  }
}

const app = new Controller(new Model(), new View());