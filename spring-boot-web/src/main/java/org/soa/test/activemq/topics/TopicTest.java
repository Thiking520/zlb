package org.soa.test.activemq.topics;
 
import org.apache.activemq.command.ActiveMQTopic;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
 
import javax.jms.Destination;
 
/**
 * Created by JamesC on 16-9-22.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/spring-jms.xml")
public class TopicTest {
 
 
    @Autowired
    private ActiveMQTopic topicDestination;
 
    @Autowired
    private TopicProvider provider;
 
    //向默认Topic发消息
    @Test
    public void send() {
        //坑爹的是：这里不要用ActiveMQQueue，会默认按Queue发送；要使用ActiveMQTopic，按Topic发送
        //ActiveMQQueue des = new ActiveMQQueue("topic1");
        ActiveMQTopic des = new ActiveMQTopic("topic1");
        provider.publish(des,"topic消息示例");
    }
}