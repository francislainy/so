import {IconButton} from "@material-ui/core";
import React from "react";
import '../css/CustomStyle.css'

const MyIconButton = ({children}) => (
    <IconButton className="iconButton">{children}</IconButton>
)

export default MyIconButton