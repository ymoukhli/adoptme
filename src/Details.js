import { Component } from "react";
import ThemeContext from "./ThemeContext";
import Carousel from "./Carousel";
import Modal from "./Modal";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

class Details extends Component {
      state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.router.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => (window.location = "http://bit.ly/pet-adopt");
  render() {
    if (this.state.loading) {
        return <h2>loading … </h2>;
      }
  
      const {
        animal,
        breed,
        city,
        state,
        description,
        name,
        images,
        showModal,
      } = this.state;
    return (
      <div className="details">
        <Carousel images={images} />;
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
const DetailsWithRoute = withRouter(Details);

export default function DetailsErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <DetailsWithRoute {...props} />
      </ErrorBoundary>
    );
  }