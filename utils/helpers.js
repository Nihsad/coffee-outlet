module.exports = {
    // format_date will take in a timestamp and return a string with only the date
    // like MM/DD/YYYY
    format_date: (date) => {
        return date.toLocaleDateString();
    },

    // encodeURIComponent will take in a string and return a URL-encoded string
    encodeURIComponent: (text) => {
        return encodeURIComponent(text);
    },

    json: function (context) {
        return JSON.stringify(context);
    },

    prepPictureUrl: function (picture) {
        console.log(`PICTURE: '${picture}'`);
        picture = picture.replace(/\\/g, '/');
        if (picture.startsWith('/')) {
            picture = picture.slice(1);
        }
        if (/^https?:\/\//.test(picture)) {
            console.log(`PICTURE AFTER: '${picture}'`);
            return picture;
        } else if (picture.startsWith('upload/images/')) {
            picture = '/' + picture.replace('//upload/images/upload/images/', 'upload/images/');

        } else if (picture.startsWith('/upload/images/upload/images/')) {
            picture = picture.replace('/upload/images/upload/images/', '/upload/images/');
        }
        else if (!picture.startsWith('/upload/images/')) {
            // Split by '/upload/images/' and join back together with only one '/upload/images/' in between
            picture = '/upload/images/' + picture;

        } 
        console.log(`PICTURE AFTER: '${picture}'`);
        return picture;
    }
}

