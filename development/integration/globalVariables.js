module.exports = {
    locators: {
        css: {
            sidebars: {
                home: "[data-test='sidenav-home']",
                myAccount: "[data-test='sidenav-user-settings']",
                myAccountSettings: "[data-test='sidenav-bankaccounts']",
                notifications:  "[data-test='sidenav-notification']",
                logout:  "[data-test='sidenav-signout']",
            },
            buttons: {
                btSignin: "[data-test='signin-submit']",
                btNew: "[data-testid='AttachMoneyIcon']",
                btPay: "[data-test='transaction-create-submit-payment']",
            },
            inpSearchField: "[data-test='user-list-search-input']",
            contactList: {
                userList: "[data-test='users-list']",
            },
            navView:{
                everyone: "[data-test='nav-public-tab']",
                friends: "[data-test='nav-contacts-tab']",
                mine: "[data-test='nav-personal-tab']",
            },
        },
    },
}