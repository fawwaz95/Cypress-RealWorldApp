module.exports = {
    locators: {
        css: {
            sidebars: {
                home: "sidenav-home",
                myAccount: "sidenav-user-settings",
                bankAccounts: "sidenav-bankaccounts",
                notifications:  "sidenav-notification",
                logout:  "sidenav-signout",
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
    elementPathTypes: {
        css: "css",
        xpath: "xpath",
        id: "id",
        bt: "button",
    },
    labels: {
        topNavView: {
            everyone: "Everyone",
            friends: "Friends",
            mine: "Mine",
        },
        buttons: {
            btSave: "Save",
            btCreate: "Create",
            btDelete: "Delete",
        }
    },
}