const axios = require('axios')

class Api {

    constructor(url) {
        this.url = url
    }

    submitFile(file) {
        console.log('entered submit file')
        return axios.post('http://localhost:8081/api/gatling-tool/csv/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    submitJsonStats(id, files) {
        console.log('entered submit file')

        let i;
        files.forEach((file, index) => {
            if (file.originFileObj.name === 'stats.json') {
                i = index;
            }
        })

        const formData = new FormData()
        formData.append(
            "file",
            files[i].originFileObj,
            files[i].originFileObj.name
        );

        console.log('after formData')

        return axios.post(`http://localhost:8081/api/gatling-tool/json/import/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            console.log(result)
        }).catch(reason => {
            console.log(reason)
        })
    }

    submitHtmlIndex(id, files) {
        console.log('entered submit file')

        let i;
        files.forEach((file, index) => {
            if (file.originFileObj.name === 'index.html') {
                i = index;
            }
        })

        const formData = new FormData()
        formData.append(
            "file",
            files[i].originFileObj,
            files[i].originFileObj.name
        );

        return axios.post(`http://localhost:8081/api/gatling-tool/report/upload/html/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            console.log(result)
        }).catch(reason => {
            console.log(reason)
        })
    }

}

module.exports = Api
