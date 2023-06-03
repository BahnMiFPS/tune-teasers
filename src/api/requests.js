const requests = [
  {
    name: "Vietnam",
    url: `https://tune-teasers.herokuapp.com/api/playlists?country=VN&locale=vi_VN`,
    // url: `http://localhost:3001/api/playlists?country=VN&locale=vi_VN`,
  },
  {
    name: "US",
    url: `https://tune-teasers.herokuapp.com/api/playlists?country=US&locale=en_US`,
    // url: `http://localhost:3001/api/playlists?country=US&locale=en_US`,
  },

  {
    name: "Kpop",
    url: `https://tune-teasers.herokuapp.com/api/playlists?country=KR&locale=ko_KR`,
    // url: `http://localhost:3001/api/playlists?country=KR&locale=ko_KR`,
  },
];

export { requests };
