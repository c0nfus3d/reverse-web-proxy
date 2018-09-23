module.exports = {
  ssl: {
    /** Path to your SSL key */
    key: "/path/to/privkey.pem",
    /** Path to your SSL certificate */
    cert: "/path/to/cert.pem"
  },
  routes: {
    /** If no matching directory is found, use this URL */
    default: "http://main-server/",
    /** List of folders to URLs */
    folder: {
      "server1": "http://server1/myapp/",
      "server2": "http://server2/"
    }
  }
};