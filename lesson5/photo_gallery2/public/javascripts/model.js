class Model {
  constructor() {
    this.domain = 'http://localhost:3000';
    this.photos;
  }

  async getPhotos() {
    this.photos = await fetch(this.domain + '/photos')
                            .then(res => res.json());
  }

  async getComments(id) {
    this.comments = await fetch(this.domain + `/comments?photo_id=${id}`)
                              .then(res => res.json());
  }

  async updateLikesOrFaves(href, id) {
    await fetch(href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `photo_id=${id}`,
    });
  }

  async postComment(data) {
    await fetch(this.domain + '/comments/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });
  }
}

export default Model;