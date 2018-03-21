class Github {
  constructor() {
    this.client_id = 'd32881df5bfe37803f1a';
    this.client_secret = '48b82e0ae4d9c91a6279a5c16905dbf9b805effd';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'; 
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);


    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile, //same as profile: profile
      repos // same as repos: repos
    }
  }
}