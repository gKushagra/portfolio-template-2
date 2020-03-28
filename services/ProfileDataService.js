const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * Logic for reading file from profile_data.json
 */

class ProfileDataService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSON file that contains the profile data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getProfileData() {
    const data = await this.getData();
    return data;
  }

  /**
   * Fetches feedback data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = ProfileDataService;
