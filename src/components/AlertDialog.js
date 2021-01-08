import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    this.props.deleteHandler();
    this.handleClose();
  };
  handleDisagree = () => {
    this.handleClose();
  };
  render() {
    return (
      <div>
        {/* Button to trigger the opening of the dialog */}
        <button onClick={this.handleClickOpen}>Delete</button>
        {/* Dialog that is displayed if the state open is true */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {"Recipe delete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete this Recipe?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDisagree} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleAgree} color='primary' autoFocus>
              Yes. Delete.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;