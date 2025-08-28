import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import HeaderLogo from '../../assets/images/cwHeader.png';
import SectionLogo from '../../assets/images/cwSec.png';
import * as actions from '../../store/actions/index';
import StorageUtil from '../../utils/storageUtil';
import { updateObject, checkValidity } from '../../shared/utility';
import ToastAuth from './Components/ToastAuth';

class Login extends Component {
 
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        isSignup: true
    }

    componentDidMount() {
        this.props.history.index=0;
        let shadesEl = document.querySelector('.transparent-panel');
        if (shadesEl) {
            shadesEl.classList.remove('show');
        }
    }
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({ controls: updatedControls });
    }
    

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );
        /*
        if ( this.props.loading ) {
            form = <Spinner />
        }
        */

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated && StorageUtil.getUser() !== null) {
			console.log('[you are existing]',this.props.isAuthenticated);
			<Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div>
       
                <ToastAuth />
          <header className="header02">
                <div className="container">
                </div>
            </header>
            <div>
     
    </div>
            <section className="login-sec">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="logreg-form">
                      <div className="logreg-form-header">
                        <h3>JASMIN BILLER APP</h3>
                      </div>
                      <div className="logreg-form-body">
                        <form onSubmit={this.submitHandler}>
  
                        {form}
                    
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>
                      </div>
                       </div>
                    
                  </div>
                </div>
              </div>
            </section>
            </div>
          
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);