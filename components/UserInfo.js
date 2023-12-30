export default class UserInfo {
    constructor(profileTitleSelector, profileDescriptionSelector) {
        this._profileTitle = document.querySelector(profileTitleSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
    }
// return object containing the text content of the profile elements
    getUserInfo() {
        return {
            title: this._profileTitle.textContent,
            description: this._profileDescription.textContent,
        };
      
    }
    //pass in the values from the form submission
    setUserInfo(title, description) {
        this._profileTitle.textContent = title;
        this._profileDescription.textContent = description;
    }
}


