// @flow
import { connect } from 'react-redux';
import MedicareContainer from './components/MedicareContainer';
import { medicareStateSelector } from '../../../store/selectors/imsSelector';
import {  attemptToParseMedicare,resetParseMedicareState } from '../../../store/actions/imsAction';

const mapStateToProps = store => ({
    medicareState: medicareStateSelector(store)
});

const mapDispatchToProps = dispatch => ({
    parseMedicare : (data) => dispatch(attemptToParseMedicare(data)),
    resetMedicare: () => dispatch(resetParseMedicareState())
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicareContainer);