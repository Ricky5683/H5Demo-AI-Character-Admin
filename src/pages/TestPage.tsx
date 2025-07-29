import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Text } = Typography

const TestPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>测试页面</Title>
      <Card>
        <Text>这是一个简单的测试页面，用来验证路由是否正常工作。</Text>
        <br />
        <Text type="secondary">如果您能看到这个页面，说明路由配置是正确的。</Text>
      </Card>
    </div>
  )
}

export default TestPage 