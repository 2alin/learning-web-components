/*
To consider:
  + bookmark list is rendered in an inefficient way for 
    a long list of items
  + bookmark-button is not isolated, it depends on 
    `bookmarks` and triggers `bookmarList.render`
*/

const bookmarkList = document.querySelector('ul[is="bookmark-list"]');
const bookmarks = [];

class LikeButton extends HTMLButtonElement {
  constructor() {
    super();
    this.counter = 0;
    this.addEventListener('click', () => {
      this.counter++;
      this.render();
    });
  }
  connectedCallback() {
    if (!this.rendered) this.render();
  }
  render() {
    this.innerHTML = `Like! [ ${this.counter} ]`;
  }
}

customElements.define('like-button', LikeButton, { extends: 'button' });

class BookmarkButton extends HTMLButtonElement {
  constructor() {
    super();

    this.addEventListener('click', () => {
      const { tweetId } = this;

      // bookmark logic
      const bookmarkIndex = bookmarks.indexOf(tweetId);
      if (bookmarkIndex < 0) bookmarks.push(tweetId);
      else bookmarks.splice(bookmarkIndex, 1);

      // trigger bookmark-list render
      bookmarkList.render();

      // render button after bookmark state changed
      this.render();
    });
  }

  connectedCallback() {
    const tweetEntry = this.closest('tweet-entry');
    this.tweetId = tweetEntry ? tweetEntry.id : null;
    if (!this.rendered) this.render();
  }

  render() {
    const { tweetId } = this;
    if (bookmarks.includes(tweetId)) this.setAttribute('title', 'unbookmark');
    else this.setAttribute('title', 'bookmark');
    this.rendered = true;
  }
}
customElements.define('bookmark-button', BookmarkButton, { extends: 'button' });

class Tweet extends HTMLElement {
  connectedCallback() {
    if (!this.rendered) this.render();
  }

  render() {
    // inject children into a paragrah
    const p = document.createElement('p');
    p.append(...this.childNodes);
    this.append(p);

    // create footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
    <button is="bookmark-button" data-parent-id="pikachu"></button>
    <button is="like-button"></button>
    `;
    this.append(footer);

    this.rendered = true;
  }
}
customElements.define('tweet-entry', Tweet);

class BookmarkList extends HTMLUListElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    if (!this.rendered) this.render();
  }

  render() {
    this.innerHTML = '';
    for (let tweetId of bookmarks) {
      const tweetContent = document.getElementById(tweetId).querySelector('p')
        .innerHTML;
      const li = document.createElement('li');
      li.innerHTML = tweetContent;
      this.append(li);
    }

    this.rendered = true;
  }
}
customElements.define('bookmark-list', BookmarkList, { extends: 'ul' });
