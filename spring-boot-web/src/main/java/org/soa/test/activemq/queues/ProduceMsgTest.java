package org.soa.test.activemq.queues;
 
import com.alibaba.fastjson.JSON;
import org.apache.activemq.command.ActiveMQQueue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.soa.test.activemq.StudentInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
 
import javax.jms.Destination;
import java.util.Date;
 
//http://www.coderli.com/junit-spring-test-applicationcontext/
 
/**
 * Created by JamesC on 16-9-22.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/spring-jms.xml")
public class ProduceMsgTest extends AbstractJUnit4SpringContextTests {
 
    @Autowired
    protected ApplicationContext ctx;
 
    /**
     * 队列名queue1  这里使用jms配置文件中的数据
     */
    @Autowired
    private Destination queueDestination;
 
    /**
     * 队列消息生产者
     */
    @Autowired
    private ProduceMsg produceMessage;
 
 
    //向默认队列发消息（文本）
    @Test
    public void produceMsg_DefaultQueue() {
        String msg = "这里是向默认队列发送的消息" + new Date().toString();
        produceMessage.sendMessage(msg);
    }
 
    //向默认队列发消息(Json字符串)
    @Test
    public void produceMsg_Json() {
        StudentInfo info = new StudentInfo();
        info.setId(1);
        info.setStdName("李磊");
        info.setStdNo("001");
        info.setEnterDate(new Date());  //队列存放的是时间戳
 
        String alibabaJson = JSON.toJSONString(info);
        produceMessage.sendMessage(alibabaJson);
    }
 
    //向默认队列发消息(使用convertAndSend发送对象）
    @Test
    public void produceMsg_ConvertAndSend() {
        StudentInfo info = new StudentInfo();
        info.setId(1);
        info.setStdName("李磊");
        info.setStdNo("001");
        info.setEnterDate(new Date());
 
        produceMessage.sendMessageConvertAndSend(info);
    }
 
    //向指定队列发消息(文本)
    @Test
    public void produceMsg_CustomQueue() {
        for (int i = 0; i < 20; i++) {
            ActiveMQQueue myDestination = new ActiveMQQueue("queueCustom");
            produceMessage.sendMessage(myDestination, "----发送消息给queueCustom");
        }
    }
 
    //向指定队列发消息(队列名称从XML读取)
    @Test
    public void produceMsg_XmlQueue() {
        for (int i = 0; i < 20; i++) {
            ActiveMQQueue destinationQueue = (ActiveMQQueue) applicationContext.getBean("queueDestination");
            produceMessage.sendMessage(destinationQueue, "----send my msg to queueXml");
        }
    }
 
    //向指定队列发消息(发送对象)
    @Test
    public void produceMsg_StudentInfo() {
 
        StudentInfo info = new StudentInfo();
        info.setId(1);
        info.setStdName("李磊");
        info.setStdNo("001");
        info.setEnterDate(new Date());
 
        ActiveMQQueue destination = new ActiveMQQueue("StudentInfo");
        produceMessage.sendStudentInfo(destination, info);
    }
}