# Deploy-Angular-REST-SpringBOOT-Oracle

1. Pour deployer Angular ( Sous Apache, Nginx ... ) il faut faire quelques modifications : 
   --> Dans le index.html : 
    * Commenter  < base href="/" >
    * La modifier par : <script>document.write('<base href="' + document.location + '" />');</script>
    
   --> Et dans le app-routing.module.ts : 
    * Ajouter useHash:true comme suit ; 
       @NgModule({ 
    imports: [RouterModule.forRoot(routes , {
        onSameUrlNavigation: 'reload',
        enableTracing: false,
        useHash:true
      }  )],
    exports: [RouterModule]
})
export class AppRoutingModule {}

2. Pour deployer Spring boot ( Sous Apache ) il faut faire quelques modifications : 

  --> Dans la classe main ( Application.java ) il faut ajouter 
  extends SpringBootServletInitializer et SpringApplicationBuilder configure comme suit :
  
  @SpringBootApplication
public class Application extends SpringBootServletInitializer{

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

	public static void main(String[] args) {
		 SpringApplication.run(Application.class, args);
		}
    
    }


  --> Dans le pom.xml il faut le modifier avec : 
  	<packaging>war</packaging> , <start-class>org.catsid.Application</start-class> et ajouter la dépendance de 
	spring-boot-starter-tomcat
  
  <groupId>org.sid</groupId>
	<artifactId>MyCatalogue</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>

	<name>MyCatalogue</name>
	<description>Spring Angular </description>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>1.5.9.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<start-class>org.catsid.Application</start-class>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
	<!-- marked the embedded servlet container as provided -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-tomcat</artifactId>
		<scope>provided</scope>
	</dependency>
	</dependencies>

  --> Enfin Clique droit sur le projet à deployer : 
   	Run As > Run Configuration > Name : génération WAR  > Goals : clean package
	

3. Mettre le war de Spring boot sous apache dans le dossier " webapps " et le dist de angular sous " html " de nginx ou sous " webapps " sous apache .
