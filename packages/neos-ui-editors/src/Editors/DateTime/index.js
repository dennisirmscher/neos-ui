import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DateInput from '@neos-project/react-ui-components/src/DateInput/';
import moment from 'moment';
import {neos} from '@neos-project/neos-ui-decorators';
import convertPhpDateFormatToMoment, {hasDateFormat, hasTimeFormat} from './helpers';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@connect($transform({
    interfaceLanguage: $get('user.preferences.interfaceLanguage')
}))
class DateTime extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        commit: PropTypes.func.isRequired,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        options: PropTypes.object,
        id: PropTypes.string,
        i18nRegistry: PropTypes.object,
        interfaceLanguage: PropTypes.string
    }

    render() {
        const {
            id,
            className,
            value,
            commit,
            placeholder,
            options,
            i18nRegistry,
            interfaceLanguage
        } = this.props;
        const mappedValue = (typeof value === 'string' && value.length) ? moment(value).toDate() : (value || undefined);

        const onChange = date => {
            commit(date ? moment(date).format('YYYY-MM-DDTHH:mm:ssZ') : '');
        };

        return (
            <DateInput
                id={id}
                className={className}
                value={mappedValue}
                onChange={onChange}
                labelFormat={convertPhpDateFormatToMoment(options.format)}
                dateOnly={!hasTimeFormat(options.format)}
                timeOnly={!hasDateFormat(options.format)}
                placeholder={placeholder || i18nRegistry.translate('content.inspector.editors.dateTimeEditor.noDateSet', '', {}, 'Neos.Neos', 'Main')}
                todayLabel={i18nRegistry.translate('content.inspector.editors.dateTimeEditor.today', 'Today', {}, 'Neos.Neos', 'Main')}
                applyLabel={i18nRegistry.translate('content.inspector.editors.dateTimeEditor.apply', 'Apply', {}, 'Neos.Neos', 'Main')}
                locale={interfaceLanguage}
                disabled={options.disabled}
                />
        );
    }
}

export default DateTime;
