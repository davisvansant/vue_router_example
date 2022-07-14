let token = '';

interface LoginInfo {
    username: string,
    password: string,
};

enum MessageKind {
    LoginInfo = "LOGININFO",
    Token = "TOKEN",
}

interface Message {
    kind: MessageKind,
    contents: string | LoginInfo,
}

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

            const contents: LoginInfo = {
                username: 'some_awesome_username',
                password: 'some_awesome_password',
            };

            const loginInfo: Message = {
                kind: MessageKind.LoginInfo,
                contents: contents,
            }

            postMessage(loginInfo);

            break;
        }
        case 'token': {
            console.log("received token!");

            const tokenMessage: Message = {
                kind: MessageKind.Token,
                contents: token,
            };

            postMessage(tokenMessage);

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

export default Message;
