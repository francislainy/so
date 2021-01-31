import React, {useCallback, useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {createCategory, retrieveCategories} from "../api";
import {url, port} from "../helper/Helper";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({children, onClick, setShow, onChange}, ref) => (
    <a
        style={{color: "orange", textDecoration: "none"}}
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onChange()
            onClick(e);
            setShow(prevState => !prevState)
        }}
    >
        {children}
        &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style} //todo: get style from parent element
                className={className}
                aria-labelledby={labeledBy}
            >
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

export function CustomDropdown(props) {

    const [data, setData] = useState({categories: [], isFetching: false});
    const [input, setInput] = useState('');
    const [show, setShow] = useState(false)

    const useFetchData = ({payload}) => {
        const [res, setRes] = useState({data: null, isLoading: false});

        const callAPI = useCallback(() => {
            setRes(prevState => ({...prevState, isLoading: true}));

            if (payload.title !== '') {

                const axiosParams = {
                    url: url,
                    port: port,
                    payload: payload
                }

                createCategory(axiosParams).then(res => {
                    setRes({data: res.data, isLoading: false});

                    setShow(false)
                    // props.onHandleChangeCategory(payload.title, payload.id)
                }).catch((error) => {
                    setRes({data: null, isLoading: false});
                })
            }
        }, [payload])
        return [res, callAPI];
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({categories: data.categories, isFetching: true});

                const axiosParams = {
                    url: url,
                    port: port,
                }

                retrieveCategories(axiosParams)
                    .then(response => setData({categories: response.data.categories, isFetching: false}))

            } catch (e) {
                console.log(e);
                setData({categories: data.categories, isFetching: false});
            }
        };
        fetchData().then(r => console.log(r))
    }, [show]);

    const handleChange = (e) => {

        if (e !== '') {
            setInput(e.currentTarget.value);
        } else {
            setInput('')
        }
    }

    const [, addCategory] = useFetchData({payload: {"title": `${input}`}});

    return (
        <div>
            <Dropdown show={show}>
                <Dropdown.Toggle
                    setShow={setShow}
                    onChange={() => handleChange('')}
                    as={CustomToggle} id="dropdown-custom-components">
                    Report Category
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                    {data.categories.map((item, i) => {
                        return <Dropdown.Item
                            onClick={() => props.onHandleChangeCategory(item.title, item.id)}>{item.title}</Dropdown.Item>
                    })}
                    <div className="margin10">
                        <input type="text" onChange={handleChange} value={input}/>
                        <button style={{backgroundColor: "orange", color: "white"}} onClick={() => {
                            addCategory()
                        }} type="button">+
                        </button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );

}
