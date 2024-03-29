import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import {getLogs} from '../../actions/logActions';

const Logs = ({log: {logs, loading}, getLogs}) => {
    // const [logs, setLogs] = useState([]);
    // const [loading, setLoading ] = useState(false);

    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, []);

    // const getLogs = async () => {
    //     setLoading(true);
    //     const res = await fetch('/logs');
    //     const data = await res.json();
    //     setLogs(data);
    //     setLoading(false);
    // }

    if (loading || logs == null) {
        return <Preloader/>;
    }

    return (
        <Fragment>
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4 className='center'>System Logs</h4>
                </li>
                {
                    logs.length === 0 && !loading ? (
                        <p className='center'>No logs to show...</p>
                    ) : (
                    logs.map(log => (
                        <LogItem key={log.id} log={log}/>
                    )))
                }
            </ul>
        </Fragment>
    );
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    log: state.log
});

export default connect(mapStateToProps, {getLogs})(Logs);
