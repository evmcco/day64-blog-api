const db = require("./conn.js");

class Posts {
  constructor(id, title, author, content) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
  }

  static async getAll() {
    try {
      const response = await db.any(`select * from posts`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getOneById(id) {
    try {
      const response = await db.one(`select * from posts where id = ${id}`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async removePost(id) {
    try {
      const response = await db.result(`delete from posts where id = ${id}`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async addPost(title, content, author_id) {
    const query = `insert into posts(title, content, author_id) values ('${title}', '${content}', ${author_id});`;
    try {
      let response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async updatePost(id, column, content) {
    const query = `update posts set ${column} = ${content} where id = ${id}`;
    try {
      let response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Posts;
