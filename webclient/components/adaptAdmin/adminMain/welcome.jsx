import React from 'react';
import {
  Button,
  Image,
  Modal,
  Divider,
  Form,
  Icon
} from 'semantic-ui-react';
import './profile.css';
export default class ClientProfile extends React.Component
{
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <Modal size='small' open={true} onClose={this.close}
        closeOnRootNodeClick={false} closeIcon='close'>
        <Modal.Header id="updateheader"><Icon name='user'/>Edit Profile</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium'>
            <Dropzone ref='dropzone' multiple={false} default={'../../images/user.png'}
            accept={'image/*'} onDrop={this.onDrop}>
            {imagechange}
          </Dropzone><br/>
          <Button primary onClick={this.uploadImage}>
            Change Photo
          </Button>
        </Image>
        <Modal.Description id="clientmodal">
          <Form onSubmit={this.OnSubmitData}>
            <Form.Field>
              <label>First Name</label>
            </Form.Field>
            <Form.Input name="firstName" onChange={this.ChangeFirst}
              placeholder='First Name'/>
              <Form.Field>
                <label>Last Name</label>
                <Form.Input name="lastName" onChange={this.ChangeLast.bind(this)}
                  placeholder='Last Name'/>
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <Form.Input placeholder='email' name="email"
                    value={this.state.email} disabled/>
                    <Divider/>
                  </Form.Field>
                  <Button onClick={this.show('small')}
                    disabled={(!this.state.firstname) || (!this.state.lastname)}
                    color='blue' type='submit'>Save</Button>
                  </Form>
                  <Modal size={size} open={open}>
                    <Modal.Header>
                      <h2>
                        <Image src='../../images/thumb.gif' size="small" avatar/>
                        Updated Suceessfully</h2>
                      </Modal.Header>
                      <Modal.Actions>
                        <Button color='gray' onClick={this.profile.bind(this)}>
                          <Button.Content visible>
                            <Icon name='thumbs up'/>Ok</Button.Content>
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              );
            }
          }
