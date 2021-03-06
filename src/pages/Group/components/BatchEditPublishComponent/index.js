/* eslint-disable react/sort-comp */
import { Button, Checkbox, Divider, Form, Modal } from 'antd';
import { PureComponent } from 'react';

@Form.create()
class BatchEditPublishComponent extends PureComponent {
  constructor(arg) {
    super(arg);
    this.state = {
      indeterminate: true,
      checkAll: false,
      checkedList: [],
      allOptions: []
    };
  }

  componentDidMount() {
    this.setOptions();
  }
  setOptions = () => {
    const { components, allcomponents } = this.props;
    if (components) {
      const options = components.map(item => item.service_share_uuid);
      const alloptions = allcomponents.map(item => item.service_share_uuid);
      this.setState({
        allOptions: alloptions,
        checkedList: options
      });
    }
  };
  batchEdit = () => {
    const { checkedList } = this.state;
    const { onOk } = this.props;
    if (onOk) {
      onOk(checkedList);
    }
  };
  onChange = checkedList => {
    const { allOptions } = this.state;
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < allOptions.length,
      checkAll: checkedList.length === allOptions.length
    });
  };

  onCheckAllChange = e => {
    const { allOptions } = this.state;
    this.setState({
      checkedList: e.target.checked ? allOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
  render() {
    const { indeterminate, checkAll, checkedList } = this.state;
    const { allcomponents, onCancel } = this.props;
    return (
      <Modal
        title="批量编辑待发布组件"
        visible
        maskClosable={false}
        onOk={this.batchEdit}
        onCancel={onCancel}
        okText="确定"
        cancelText="取消"
      >
        <div>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            checked={checkAll}
          >
            选择全部
          </Checkbox>
          <Divider />
          <Checkbox.Group
            style={{
              width: '100%',
              display: 'flex',
              flexFlow: 'row wrap'
            }}
            onChange={this.onChange}
            value={checkedList}
          >
            {allcomponents.map(apptit => {
              return (
                <div style={{ padding: '8px', flex: '0 0 50%' }}>
                  <Button
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      overflow: 'hidden'
                    }}
                  >
                    <Checkbox
                      checked
                      value={apptit.service_share_uuid}
                      style={{ marginRight: '10px' }}
                    />
                    {apptit.service_cname}
                  </Button>
                </div>
              );
            })}
          </Checkbox.Group>
        </div>
      </Modal>
    );
  }
}

export default BatchEditPublishComponent;
