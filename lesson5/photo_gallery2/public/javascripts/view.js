class View {
  constructor() {
    this.templates = {};
    this.slides = $('#slides');
    this.currentSlide; 
    this.header = $('header');
    this.form = $('form');
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
    return $(slide);
  }

  prev(handler) {
    $('main').on('click', 'a.prev', e => {
      e.preventDefault();
      this.currentSlide = this.getCurrentSlide();
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
      this.currentSlide = this.getCurrentSlide();
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

  likeOrFave(handler) {
    this.header.on('click', 'a', e => {
      e.preventDefault();
      handler(e.target.href, $(e.target).data('id'));
    })
  }

  postComment(handler) {
    this.form.on('submit', e => {
      e.preventDefault();
      this.currentSlide = this.getCurrentSlide();
      let photoId = this.currentSlide.data('id');
      $('input[name="photo_id"').val(photoId)
      handler(photoId, $(this.form).serialize());
      this.form[0].reset();
    })
  }
}


export default View;