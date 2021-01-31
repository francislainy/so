import React, {useEffect, useState} from 'react';
import {retrieveCategories} from "../api";
import ConfirmationModal from "../components/ConfirmationModal";
import {url, port} from "../helper/Helper";
import Alert from "@material-ui/lab/Alert";
import CategoryTable from "../components/CategoryTable";
import CheckIcon from "@material-ui/icons/Check";

function Settings({handleDeletePopUp, showConfirmationModal, onConfirmDelete, onHide, showAlert}) {

    const [categories, setCategories] = useState({
        categories: [
            {
                id: "",
                title: ""
            }
        ]
        , isFetching: false
    })

    useEffect(() => {

        const axiosParams = {
            url: url,
            port: port,
        }

        retrieveCategories(axiosParams)

            .then(({data}) => {
                    setCategories({...data, isFetching: true})
                }
            ).catch(reason => {
            console.log(reason + ' reason for failure on retrieving category table items')
        })

    }, [!showAlert])

    return (
        <div>
            <h3 className="margin10">Categories</h3>
            {showAlert && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Item successfully deleted</Alert>}
            {categories !== undefined && categories.categories !== undefined &&
            <CategoryTable
                data={categories.categories}
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
    );
}

export default Settings