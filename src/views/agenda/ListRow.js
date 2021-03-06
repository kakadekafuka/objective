/**
 * Created by Layman(http://github.com/anysome) on 16/2/29.
 */
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
import TouchableBounce from 'TouchableBounce';

import {colors, styles} from '../../app';
import objective from '../../logic/Objective';


export default class ListRow extends React.Component {

  constructor(props) {
    super(props);
    this.done = props.sectionId === 2;
    this.future = props.sectionId == 1;
  }

  _transform(data) {
    if (this.done) {
      return {
        icon: <Image source={require('../../../resources/icons/checked.png')} style={styles.iconSmall} />,
        priority: data.priority,
        title: data.title,
        detail: data.detail,
        arrangeDate: moment(data.doneTime).format('H:mm')
      };
    } else if (this.future) {
      return {
        icon: <Image source={require('../../../resources/icons/up.png')} style={{tintColor: objective.getPriorityColor(data.priority)}} />,
        priority: data.priority,
        title: data.title,
        detail: data.detail,
        reminder: data.reminder,
        arrangeDate: moment(data.today).format('M月 D日')
      };
    } else {
      return {
        icon: <Image source={require('../../../resources/icons/checkbox.png')} style={{tintColor: objective.getPriorityColor(data.priority)}} />,
        priority: data.priority,
        title: data.title,
        detail: data.detail,
        reminder: data.reminder,
        arrangeDate: this.props.today === data.today ? false : moment(data.today).from(this.props.today)
      };
    }
  }

  render() {
    var transform = this._transform(this.props.data);
    return (
      <TouchableBounce style={style.container} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
        <TouchableBounce onPress={this.props.onIconClick} style={style.icon}>
          {transform.icon}
        </TouchableBounce>
        <Text style={[styles.title, style.body]}>
          { transform.priority > 8 ? <Text style={style.alert}>!! </Text> :
            transform.priority > 3 ? <Text style={style.alert}>! </Text> : null }
          {transform.title}
        </Text>
        {transform.reminder && <Image source={require('../../../resources/icons/bell.png')} style={styles.iconSmall} />}
        {transform.arrangeDate && <Text style={style.hint}>{transform.arrangeDate}</Text>}
      </TouchableBounce>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  icon: {
    paddingLeft: 16
  },
  alert: {
    paddingRight: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    marginLeft: 10,
    marginRight: 10
  },
  tail: {
    alignItems: 'flex-end'
  },
  hint: {
    textAlign: 'right',
    fontSize: 12,
    color: colors.border,
    marginLeft: 5
  }
});
