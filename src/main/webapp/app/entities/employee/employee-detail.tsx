import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Employee [<b>{employeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="first_name">First Name</span>
            </dt>
            <dd>{employeeEntity.first_name}</dd>
            <dt>
              <span id="last_name">Last Name</span>
            </dt>
            <dd>{employeeEntity.last_name}</dd>
            <dt>
              <span id="oib">Oib</span>
            </dt>
            <dd>{employeeEntity.oib}</dd>
            <dt>
              <span id="bank_account_no">Bank Account No</span>
            </dt>
            <dd>{employeeEntity.bank_account_no}</dd>
            <dt>Address</dt>
            <dd>{employeeEntity.address ? employeeEntity.address.id : ''}</dd>
            <dt>User</dt>
            <dd>{employeeEntity.user ? employeeEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/employee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
