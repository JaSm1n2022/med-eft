// @flow
import { connect } from 'react-redux';
import MedicaidContainer from './components/MedicaidContainer';
import { medicaidStateSelector } from '../../../store/selectors/imsSelector';
import {  attemptToParseMedicaid,resetParseMedicaidState } from '../../../store/actions/imsAction';

const mapStateToProps = store => ({
    medicaidState: medicaidStateSelector(store)
});

const mapDispatchToProps = dispatch => ({
    parseMedicaid : (data) => dispatch(attemptToParseMedicaid(data)),
    resetMedicaid: () => dispatch(resetParseMedicaidState())
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicaidContainer);