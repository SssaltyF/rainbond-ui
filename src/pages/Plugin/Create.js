import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import globalUtil from '../../utils/global';
import styles from './Index.less';
import CreatePluginForm from '../../components/CreatePluginForm';

@connect()
export default class Index extends PureComponent {
  handleSubmit = val => {
    this.props.dispatch({
      type: 'plugin/createPlugin',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        ...val,
      },
      callback: data => {
        this.props.dispatch(
          routerRedux.push(
            `/team/${globalUtil.getCurrTeamName()}/region/${globalUtil.getCurrRegionName()}/myplugns/${data &&
              data.bean.plugin_id}`
          )
        );
      },
    });
  };
  render() {
    const content = <div className={styles.pageHeaderContent} />;

    const extraContent = <div className={styles.extraImg} />;

    return (
      <PageHeaderLayout
        title="创建插件"
        content={content}
        extraContent={extraContent}
      >
        <Card>
          <div
            style={{
              width: 500,
              margin: '20px auto',
            }}
          >
            <CreatePluginForm isCreate onSubmit={this.handleSubmit} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
