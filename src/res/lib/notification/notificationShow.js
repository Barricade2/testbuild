export function notification(type, message, autoClose){
        let bcolor;

        switch (type) {
          case 'success':
            bcolor = 'green'
            break;
          case 'error':
            bcolor = 'rgb(249 115 115)'
            break;
          default:
            bcolor = 'green'
        }

        const notification1 = new Notification({
            text: message,
            style: {
                height: 'auto',
                background: 'rgb(217,217,217)',
                color:'#625353',
                'border-bottom': 'outset',
                'border-bottom-color': bcolor,
            },
            position: 'bottom-right',
            autoClose: autoClose || 1000,
            showProgress:false,
            isPaused: true
        });
}