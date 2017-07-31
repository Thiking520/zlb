package org.soa.test.activemq.queues;
 
import org.soa.test.activemq.StudentInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Component;
 
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
 
/**
 * Created by JamesC on 16-9-22.
 */
@Component
public class ProduceMsg {
 
    @Autowired
    private JmsTemplate jmsTemplate;
 
    /**
     * 向指定队列发送消息
     */
    public void sendMessage(Destination destination, final String msg) {
        System.out.println("向队列" + destination.toString() + "发送了消息------------" + msg);
        jmsTemplate.send(destination, new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(msg);
            }
        });
    }
 
    /**
     * 向默认队列发送消息(默认队列名称在bean：queueDestination配置）
     */
    public void sendMessage(final String msg) {
        //queue://queue1
        String destination = jmsTemplate.getDefaultDestination().toString();
        System.out.println("向队列" + destination + "发送了消息------------" + msg);
        jmsTemplate.send(new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(msg);
            }
        });
    }
 
    /**
     * 向默认队列发送消息
     */
    public void sendMessageConvertAndSend(final Object msg) {
 
        String destination = jmsTemplate.getDefaultDestination().toString();
        System.out.println("向队列" + destination + "发送了消息------------" + msg);
        //使用内嵌的MessageConverter进行数据类型转换，包括xml(JAXB)、json(Jackson)、普通文本、字节数组
        jmsTemplate.convertAndSend(destination, msg);
    }
 
    /**
     * 向指定队列发送消息
     */
    public void sendStudentInfo(Destination destination, final StudentInfo msg) {
        System.out.println("向队列" + destination.toString() + "发送了消息------------" + msg);
        jmsTemplate.send(destination, new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                return session.createObjectMessage(msg);
            }
        });
    }
}