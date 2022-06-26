import Model from './model.js'; 
import View from './view.js'; 

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    this.loadStartPage(1);
    this.view.prev(this.handlePrev);
    this.view.next(this.handleNext);
    this.view.likeOrFave(this.handleLikeOrFave);
    this.view.postComment(this.handlePostComment);
  }

  loadStartPage = async (id) => {
    await this.model.getPhotos();
    this.view.renderPhotos(this.model.photos);
    let photo = this.model.photos[id - 1];
    this.view.renderPhotoInfo(photo);
    await this.model.getComments(photo.id);
    this.view.renderComments(this.model.comments);
  }

  loadPage = async (id) => {
    await this.model.getPhotos();
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

  handleLikeOrFave = (href, id) => {
    this.model.updateLikesOrFaves(href, id);
    this.loadPage(id);
  }

  handlePostComment = (id, data) => {
    this.model.postComment(data);
    this.loadPage(id);
  }
}

const app = new Controller(new Model(), new View());