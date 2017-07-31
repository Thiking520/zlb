package org.soa.test.activemq.queues;
 
import org.apache.activemq.command.ActiveMQQueue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.soa.test.activemq.StudentInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
 
/**
 * Created by JamesC on 16-9-22.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/spring-jms.xml")
public class ConsumeMsgTest {
 
    @Autowired
    private ConsumeMsg consumeMsg;
 
    //从指定队列接收消息（文本)
    @Test
    public void receiveMsg() {
        //没有消息阻塞一段时间后会抛异常
        //java.lang.NullPointerException
        ActiveMQQueue destination = new ActiveMQQueue("defaultQueueName");
        consumeMsg.receive(destination);
    }
 
    //从指定队列接收消息（StudentInfo对象消息)
    @Test
    public void receiveStudentInfo() {
        StudentInfo msg = consumeMsg.receiveStudentInfo();
        System.out.println(msg.getStdName());
    }
 
    //从指定队列接收消息（Json对象)
    @Test
    public void receiveConvertAndReceive() {
 
        StudentInfo msg =(StudentInfo) consumeMsg.receiveConvertAndReceive();
        System.out.println(msg.getStdName());
    }
}