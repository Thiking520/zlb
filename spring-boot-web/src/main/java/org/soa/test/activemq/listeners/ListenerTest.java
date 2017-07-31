package org.soa.test.activemq.listeners;
 
import org.junit.Test;
import org.junit.runner.RunWith;
import org.soa.test.activemq.queues.ProduceMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
 
import javax.jms.Destination;
 
/**
 * Created by JamesC on 16-9-22.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/spring-jms.xml")
public class ListenerTest {
 
    @Autowired
    @Qualifier("queueDestination3")//配置文件中只配置了接收queueDestination3的消息
    private Destination destination;
 
    @Autowired
    private ProduceMsg produceMsg;
 
    @Test
    public void sendMsg(){
        produceMsg.sendMessage(destination,"----这里测试使用配置实现监听器测试消息接收");
    }
}
