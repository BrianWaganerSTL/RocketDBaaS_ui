<h1>Rocket DBaaS UI</h1>

<h3>OverView</h3>

   The project is to create an Open Source DBaaS template that others could use

<h3>Technologies</h3>
  * Database: PostgreSQL 10
  * API: Django-Rest-Framework (Python)
  * UI: Angular 7
  * DB Agents: Python (Not written yet)
  * LoadBalancing: HAProxy
  * Automation: Ansible
  
<h3>Rocket DBaaS Goals</h3>
  * API driven
  * Database backed
  * As easy to maintain as possible but yet flexible
  * Use OpenSource as much as possible
  
<h3>Rocket DBaaS MVP1</h3>
  * UI
    * Background refreshing
    * Overview page
      * Show all your clusters and servers
      * Show all active alerts
      * Expandable Clusters to reveal the servers
      * Navigation to a given cluster's details
    * Cluster Details
      * Show Cluster and Servers details
      * Show tabs for Metrics, Backups, Restores, Activities, Alerts, Contacts, Notes, Logs
    * Pool Servers
      * Create, Terminate, Change pool servers
      * Allows for faster builds, and needed in some companies to create clusters
    * Create Cluster
      * Fill in standard information
      * Fill in resource information, which will be used to pick the correct Pool Servers
    * Reports
      * List Servers by DBMS
      * List Contacts
      * List Outages
      * List Fail-Overs
      * List Clusters/Servers that need to be OS and/or DB patched
    * Admin Pages
      * Used to supplement lack of code
      * Uses Django-Rest-Framework API's
      
    
