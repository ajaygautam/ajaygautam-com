---
layout: post
title: "Using Derby DB with Hibernate"
description: "Using Derby DB with Hibernate"
category: Java
tags: [java,hibernate,derby]
---
{% include JB/setup %}

(Wrote this [way back in 2008](http://practicinggeek.blogspot.com/2008/12/using-apache-derby-with-hibernate.html), and copied over to this blog recently)

Java: Using Apache Derby with Hibernate
Today, I came across a need to have an extremely light database. The database is to be used to store report formats. Formats change very infrequently. Its an internal application, used by only 1 user. In the coming years, the user count may grow to 10. So, the load on the database would be negligible.

Big databases like Oracle and Sybase would be an overkill for this, so I started looking at small / light weight embeddable database. Being a Java Programmer, I stuck with Java database. The choice boiled down to 2 databases HSQLDB and Apache Derby. From the documentation, it seemed like some additional configuration would be required to make HSQLDB save contents to a file. Being a lazy developer, I started looking into Derby. Apache Derby has an interesting history. When I found out that Java 6 includes Derby, it kind of sealed the deal for me. So... Derby it is.

Started going through the documentation, I quickly wrote a small script that would allow me to access my database. A little elaborate, but gets the job done:

db.sh

{% highlight shell %}
export JAVA_HOME=/apps/jdk/1.6.0_05
export JAVA=${JAVA_HOME}/bin/java
export DERBY_HOME=$JAVA_HOME/db
export DB_OPTS="-Dderby.system.home=/apps/db/derby -Dij.database=jdbc:derby:FoundryReportsDB"
export CLASSPATH=$DERBY_HOME/lib/derby.jar:$DERBY_HOME/lib/derbytools.jar

$JAVA $DB_OPTS org.apache.derby.tools.ij
{% endhighlight %}

So far, so good. I created a database at the command prompt and tries it out. Pretty nifty.

Now, next challenge: How do I integrate derby with Java and Hibernate? I wasn't sure even if hibernate supported Derby. Given, Java's support, I had a feeling that it did. Google revealed that my feeling was right. Found information scattered all over on how one could use hibernate with derby, but no central HOWTO. So, here it is:

Create a hibernate.cfg.xml file. I chose to name mine hibernate-derby.cfg.xml:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration
   PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
   "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
   <session-factory>
       <!-- database connection settings -->
       <property name="hibernate.dialect"> org.hibernate.dialect.DerbyDialect </property>
       <property name="hibernate.connection.driver_class"> org.apache.derby.jdbc.EmbeddedDriver </property>
       <property name="hibernate.connection.url"> jdbc:derby:FoundryReportsDB;create=true </property>
       <property name="hibernate.connection.username"></property>
       <property name="hibernate.connection.password"></property>

       <!-- Enable Hibernate's automatic session context management -->
       <property name="current_session_context_class">thread</property>
       <!-- JDBC connection pool (use the built-in) -->
       <property name="connection.pool_size">5</property>
       <!-- Drop and re-create the database schema on startup -->
       <property name="hbm2ddl.auto">update</property>

       <!-- helper debug settings -->
       <property name="hibernate.show_sql">true</property>
       <property name="hibernate.format_sql">false</property>

       <mapping resource="com/blah/util/Nerd.hbm.xml"/>
   </session-factory>
</hibernate-configuration>
{% endhighlight %}


After this, its pretty much straightforward Java / hibernate code:

Just for completeness sake, here are the rest of the files:

Nerd.java

{% highlight java %}
package com.blah.util;

public class Nerd {
    private String name;
    private int level;

    @Override
    public String toString() {
        return new StringBuffer(getClass().getSimpleName() + "[")
                    .append("name=").append(name)
                    .append(", level=").append(level)
                    .append("]").toString();
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getLevel() {
        return level;
    }
    public void setLevel(int level) {
        this.level = level;
    }
}
{% endhighlight %}

Nerd.hbml.xml

{% highlight xml %}
<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
          "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
          "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">

<hibernate-mapping>
    <class name="com.blah.util.Nerd" table="nerd">
        <id name="name"/>
        <property name="level"/>
    </class>
</hibernate-mapping>
{% endhighlight %}

Unit Test

{% highlight java %}
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.junit.Test;

public class DerbyTest {
    private static final Logger LOG = Logger.getLogger(DerbyTest.class);

    @Test public void testDB() {
        final Session session = initHibernate();
        try {
            Transaction tx = session.beginTransaction();
            try {
                create(session);
                list(session);

                tx.commit();
                tx = null;
            }
            finally {
                if (tx != null) {
                    tx.rollback();
                    tx = null;
                }
            }
        }
        finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }

    private void create(final Session session) {
        Nerd n = new Nerd();
        n.setName("Ajay");
        n.setLevel(10);
        session.save(n);

        n = new Nerd();
        n.setName("Arkadiy");
        n.setLevel(100000);
        session.save(n);

        n = new Nerd();
        n.setName("Ping");
        n.setLevel(1);
        session.save(n);
    }

    private void list(final Session session) {
        Query q = session.createQuery("from " + Nerd.class.getName());
        List list = q.list();
        LOG.info("Query came back with " + list.size() + " results");
        for (Object row : list) {
            LOG.debug(row.toString());
        }
    }

    public Session initHibernate() {
        final Configuration configuration = new Configuration(). configure("gds/hibernate-derby.cfg.xml");
        LOG.info("Connecting hibernate to URL=" + configuration.getProperty("hibernate.connection.url")
                 + " as user=" + configuration.getProperty("hibernate.connection.username"));
        return configuration.buildSessionFactory().getCurrentSession();
    }
}
{% endhighlight %}
