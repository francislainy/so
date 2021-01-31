import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Popup from "../components/Popup";
import ReportTable from "../components/ReportTable";
import api from "../api/api";
import {createReport, deleteReport, retrieveReports} from "../api";
import ConfirmationModal from "../components/ConfirmationModal";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {url, port} from "../helper/Helper";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";

const {useHistory} = require('react-router-dom')
const moment = require("moment");
const delay = ms => new Promise(res => setTimeout(res, ms));

function Home() {
    let history = useHistory();

    const [showImportModal, setShowImportModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')
    const [file, setFile] = useState()
    const [idSelected, setIdSelected] = useState(0);

    const handleClick = (id) => {
        history.push(`/report/${id}`);
    }

    const handleDeletePopUp = (id) => {

        setIdSelected(id)

        setShowConfirmationModal(true)
    }

    const [dataTableObj, setDataTableObj] = useState({
        "reports": [
            {
                "id": "",
                "title": "",
                "createdDate": "",
                "runDate": "",
                "category": {
                    "id": "",
                    "title:": ""
                }
            }
        ]
        , isFetching: false
    });

    const [reports, setReports] = useState(dataTableObj.reports)

    const onHide = (section) => {

        switch (section) {
            case 'import':
                setShowImportModal(false)
                break
            case 'delete':
                setShowConfirmationModal(false)
                break
        }
    }

    const onShow = () => {
        setShowImportModal(true);
    }

    const onFileAdded = (selectedFile) => {

        if (selectedFile !== null) {
            console.log('has file')
            setFile(selectedFile)
        }
    }

    const onConfirm = (inputValues) => {

        console.log('here')
        const currentDateTimestamp = moment().valueOf()

        let values = {
            "title": 'UNDEFINED',
            "runDate": file[0].lastModified, // Any index, as all the files are modified on the same test run
            "createdDate": currentDateTimestamp,
            "category": {
                "id": inputValues.categoryId,
            }
        }

        const axiosParams = {
            url: url,
            port: port,
            payload: values
        }

        createReport(axiosParams)

            .then((response) => {

                    const reportId = response.data.id

                    new api().submitJsonStats(reportId, file).then((response) => {
                            console.log('report id ' + reportId + ' successfully created')
                            new api().submitHtmlIndex(reportId, file).then(async (response) => {
                                    console.log('report id ' + reportId + ' successfully created')
                                    onHide('import')

                                    setTextAlert('Item successfully added')
                                    setShowAlert(true)
                                    await delay(2000)

                                    setShowAlert(false)

                                }
                            ).catch(reason => {
                                console.log(reason + ' reason here')
                            })
                        }
                    ).catch(reason => {
                        console.log(reason + ' reason here')
                    })
                }
            ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

    }

    const onConfirmDelete = () => {

        const axiosParams = {
            url: url,
            port: port,
            id: idSelected
        }

        deleteReport(axiosParams).then(async () => {

            const del = reports.filter(report => idSelected !== report.id)
            setReports(del)

            setShowConfirmationModal(false)

            setTextAlert('Item successfully deleted')
            setShowAlert(true)

            await delay(2000)

            setShowAlert(false)
        })
    }

    useEffect(() => {

        const axiosParams = {
            url: url,
            port: port,
        }

        retrieveReports(axiosParams)

            .then(({data}) => {
                    setDataTableObj({...data, isFetching: true})
                }
            ).catch(reason => {
            console.log(reason + ' reason for failure on retrieving report table items')
        })

    }, [showImportModal === false])

    useEffect(() => {

        setReports(dataTableObj.reports)

    }, [dataTableObj.reports.length])

    return (
        <div>
            <div>
                {showAlert &&
                <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">{textAlert}</Alert>}
                <div className="d-flex" id="wrapper">
                    {/*<Sidebar/>*/}
                    <div id="page-content-wrapper">
                        <Navbar/>
                        {/*<div style={{width: "25%"}}>Hi</div>*/}
                        <div>
                            <div style={{padding: 10, marginLeft: "3%"}}>
                                <Button variant="warning" onClick={onShow}>Import Gatling Report</Button>
                            </div>

                            <div style={{marginLeft: "6%", marginRight: "6%"}}>
                            <Popup
                                show={showImportModal}
                                onHide={() => onHide("import")}
                                onConfirm={onConfirm}
                                onFileAdded={onFileAdded}
                            />
                            {/*if at least one item we can try and populate the table..*/}
                            {reports[0].id !== "" &&
                            <ReportTable
                                // style={{marginLeft: "10%", marginRight: "10%"}} //todo: pass style from here
                                data={reports}
                                handleClick={handleClick}
                                handleDeletePopUp={handleDeletePopUp}
                            />
                            }
                            <ConfirmationModal
                                showHeader={false}
                                show={showConfirmationModal}
                                onHide={() => onHide("delete")}
                                onConfirm={onConfirmDelete}
                                ok={'OK'}
                                cancel={'Cancel'}
                                body={'Are you sure you want to delete this item?'}
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home