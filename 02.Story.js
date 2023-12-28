class Story {
  constructor(title, creator) {
    this.title = title;
    this.creator = creator;
    this._comments = [];
    this._likes = [];
    this._command = "";
  }

  get likes() {
    if (this._likes.length == 0) {
      return `${this.title} has 0 likes`;
    }
    if (this._likes.length == 1) {
      return `${this._likes[0]} likes this story!`;
    }

    if (this._likes.length > 1) {
      let name = this._likes.shift();
      return `${name} and ${this._likes.length} others like this story!`;
    }
  }

  like(username) {
    if (this._likes.includes(username)) {
      throw new Error("You can't like the same story twice!");
    }

    if (username == this.creator) {
      throw new Error("You can't like your own story!");
    }

    this._likes.push(username);

    return `${username} liked ${this.title}!`;
  }

  dislike(username) {
    if (!this._likes.includes(username)) {
      throw new Error("You can't dislike this story!");
    }

    this._likes = this._likes.filter((user) => user !== username);

    return `${username} disliked ${this.title}`;
  }

  comment(username, content, id) {
    let comment = {};

    if (!comment.id || id === undefined) {
      for (let comment of this._comments) {
        if (comment.id === id) {
          let idN = this._comments.indexOf(comment) + 1;
          id = Number(idN + `.${comment.replies.length + 1}`);

          comment.replies.push({
            id,
            username,
            content,
          });

          return "You replied successfully";
        }
      }

      comment = { id, username, content, replies: [] };
      comment.id = this._comments.length + 1;
      this._comments.push(comment);
      return `${username} commented on ${this.title}`;
    }
  }

  toString(sortingType) {
    switch (sortingType) {
      case "asc":
        this._comments.sort((a, b) => a.id - b.id);
        this._command = "asc";
        break;
      case "desc":
        this._comments.sort((a, b) => b.id - a.id);
        this._command = "desc";
        break;
      case "username":
        this._comments = this._comments.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        this._command = "username";

        break;
    }

    let buff = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`;

    for (let el of this._comments) {
      buff += `-- ${el.id}. ${el.username}: ${el.content}\n`;

      switch (this._command) {
        case "asc":
          el.replies.sort((a, b) => a.id - b.id);
          break;
        case "desc":
          el.replies.sort((a, b) => b.id - a.id);
          break;
        case "username":
          el.replies = el.replies.sort((a, b) =>
            a.username.localeCompare(b.username)
          );
          break;
      }

      if (el.replies) {
        for (let reply of el.replies) {
          buff += `--- ${reply.id}. ${reply.username}: ${reply.content}\n`;
        }
      }
    }

    buff = buff.substring(0, buff.length - 1);

    return buff;
  }
}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log();
console.log(art.toString("username"));
console.log();
art.like("Zane");
console.log(art.toString("asc"));
