import classes from './Modal.module.css'
import { Fragment } from 'react'
import ReactDOM from 'react-dom'
const Backdrop = props => {
    return (
      <div className={classes.backdrop} onClick={props.onCloseBackDrop}></div>
    );
}


const ModalOverlay = props => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children} </div>
      </div>
    );
}
const Modal = (props) => {
    const portalEle = document.getElementById("overlays")
return <Fragment>
{ReactDOM.createPortal(<Backdrop onCloseBackDrop={props.onClose}/>,portalEle)}
{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEle)}
</Fragment>
}
export default Modal;