import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAddressUpdateState {
  isNew: boolean;
}

export class AddressUpdate extends React.Component<IAddressUpdateProps, IAddressUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { addressEntity } = this.props;
      const entity = {
        ...addressEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/address');
  };

  render() {
    const { addressEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTeamResourcePlannerApp.address.home.createOrEditLabel">Create or edit a Address</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : addressEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="address-id">ID</Label>
                    <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="streetLabel" for="address-street">
                    Street
                  </Label>
                  <AvField id="address-street" type="text" name="street" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="address-city">
                    City
                  </Label>
                  <AvField id="address-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="zipLabel" for="address-zip">
                    Zip
                  </Label>
                  <AvField id="address-zip" type="text" name="zip" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="address-country">
                    Country
                  </Label>
                  <AvField id="address-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="address-phone">
                    Phone
                  </Label>
                  <AvField id="address-phone" type="text" name="phone" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/address" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressUpdate);
