let token = '';

interface LoginInfo {
    username: string,
    password: string,
};

let loginInfo: LoginInfo = {
    username: '',
    password: '',
};

addEventListener('message', message => { 
    console.log("worker has recevied message", message.data);

    switch (message.data) {
        case 'login': {
            token = login();

            postMessage('authenticated');

            break;
        }
        case 'dashboard': {
            dashboard(token);

            loginInfo = {
                username: 'some_awesome_username',
                password: 'some_awesome_password',
            };

            postMessage(loginInfo);

            break;
        }
    }
});

function login ():string {
    console.log("hi from login!");

    return 'some_super_secret_token'
}

function dashboard (token: string) {
    console.log("hi from dashboard!");
    console.log(token);
}

export default LoginInfo;
