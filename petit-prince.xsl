<?xml version = "1.0" encoding = "UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:output method="html" />

<xsl:template match="/">
<html>
 <head>
         <title>
                 Petit Prince fragment
         </title>
 </head>
 
 <body style="background-color:white;">
    <table align="center" cellspacing="50">
        <tr>
           <td><img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/prince.png"></img></td>
           <td>
              <h1 style="text-align:center; color:blue;">LePetitPrince</h1>
              <xsl:apply-templates select = "//author"/>
              <xsl:apply-templates select = "//styling_information"/>
           </td>
        </tr>
     </table>
     <hr/>
    <h3 style="text-align:left; color:black;">Début du texte :</h3>
    <xsl:apply-templates select = "//paragraph"/>
    <h4 style="text-align:left; color:black;">Fin du texte.</h4>
    <hr/>   
</body>
</html>
</xsl:template>
<xsl:template match="author">
    <br/>
         <h2 style="text-align:center; font-style: italic;"> <xsl:value-of select="text()"/></h2>
    <br/>
</xsl:template>

 <xsl:template match="styling_information">

<blockquote style ="color: darkgreen">
    Purpose of the TP on <xsl:value-of select="date/text()"/> : <xsl:value-of select="styling_description/text()"/>
    <br/>
    Authors : <xsl:value-of select="styled_by/style_manager[1]/text()"/> and <xsl:value-of select="styled_by/style_manager[2]/text()"/> and <xsl:value-of select="styled_by/style_manager[3]/text()"/> (<xsl:value-of select="styled_by/NoBinome/text()"/>)
    <br/>
    Email : <xsl:value-of select="email[1]/text()"/>
    </blockquote>
</xsl:template>

<xsl:template match="image">
    <div align="center">
        <img>
            <xsl:attribute name="src">
                <xsl:value-of select="@path"/>
            </xsl:attribute>
        </img>
    </div>
</xsl:template> 

<!--<xsl:template match="paragraph">
    <p>
    <xsl:for-each select="phrase">
        <xsl:if test="./@language = 'francais'">
            <xsl:if test="./preceding-sibling::phrase[1]/@language = 'hongrois'">
                <br/>
            </xsl:if>
            <xsl:value-of select="text()"/>
        </xsl:if>
        <xsl:if test="./@language = 'hongrois'">
            <xsl:if test="./preceding-sibling::phrase[1]/@language = 'francais'">
                <br/>
            </xsl:if>
            <span style ="color : brown; font-style: italic;">
            <xsl:value-of select="text()"/>
            </span>
        </xsl:if>
    </xsl:for-each>
    </p>
</xsl:template>
-->

<xsl:template match="paragraph">
    <p>
        <!-- si on a de la narration -->
        <xsl:if test="@type='narration'">
            <xsl:for-each select="phrase">
                <xsl:if test="./@language = 'francais'">
                    <xsl:if test="./preceding-sibling::phrase[1]/@language = 'hongrois'">
                        <br />
                    </xsl:if>
                        <!-- Make the sentence containing "mouton" bold -->
                        <xsl:choose>
                            <xsl:when test="contains(text(), 'mouton')">
                                <span style="font-size: 24px; font-weight: bold;">
                                    <xsl:value-of select="text()" />
                            </span>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="text()" />
                            </xsl:otherwise>
                        </xsl:choose>
                    <!-- Check if the text contains the word "mouton" -->
                     <xsl:if test="contains(text(), 'mouton')">
                        <img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/moutonDessin.png" title="Ship" />
                    </xsl:if>
                </xsl:if>

                <xsl:if test="./@language = 'hongrois'">
                    <xsl:if test="./preceding-sibling::phrase[1]/@language = 'francais'">
                        <br />
                    </xsl:if>
                    <span style="color: brown; font-style: italic;">
                        <xsl:value-of select="text()" />
                    </span>
                </xsl:if>
            </xsl:for-each>
        </xsl:if>

        <!-- si on a un dialogue -->
        <xsl:if test="@type='dialogue'">
            <table align="center" width="90%">
                <tr>
                    <!-- French Text Table -->
                    <xsl:if test="phrase[@language = 'francais']">
                        <td width="45%">
                            <table border="1" cellpadding="10" width="100%">
                                <xsl:for-each select="phrase[@language = 'francais']">
                                    <tr>
                                        <td width="50">
                                            <!-- si le petit prince parle -->
                                            <xsl:if test="@speaker = 'LePetitPrince'">
                                                <img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/LePetitPrince.png" title="{@speaker}" />
                                            </xsl:if>
                                            <!-- si le narrateur parle -->
                                            <xsl:if test="@speaker = 'Narrateur'">
                                                <img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/Narrateur.png" title="{@speaker}" />
                                            </xsl:if>
                                        </td>
                                        <td>
                                            <!-- Make the sentence containing "mouton" bold -->
                                            <xsl:choose>
                                                <xsl:when test="contains(text(), 'mouton')">
                                                    <span style="font-size: 24px; font-weight: bold;">
                                                         <xsl:value-of select="text()" />
                                                    </span>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:value-of select="text()" />
                                                </xsl:otherwise>
                                            </xsl:choose>
                                            <!-- Check if the text contains the word "mouton" -->
                                             <xsl:if test="contains(text(), 'mouton')">
                                                <img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/moutonDessin.png" title="Ship" />
                                            </xsl:if>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </table>
                        </td>
                    </xsl:if>

                    <!-- Spacer Column -->
                    <td></td>

                    <!-- Hungarian Text Table -->
                    <xsl:if test="phrase[@language = 'hongrois']">
                        <td width="45%">
                            <table border="1" cellpadding="10" width="100%">
                                <xsl:for-each select="phrase[@language = 'hongrois']">
                                    <tr>
                                        <td width="50">
                                            <!-- si le petit prince parle -->
                                            <xsl:if test="@speaker = 'LePetitPrince'">
                                                <img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/LePetitPrince.png" title="{@speaker}" />
                                            </xsl:if>
                                            <xsl:if test="@speaker = 'Narrateur'">
                                                <img src="/Users/isalinefoissey/Documents/ECOLE/3IFBIS/DW/LabStatementTPDW2024/images/Narrateur.png" title="{@speaker}" />
                                            </xsl:if>
                                        </td>
                                        <td>
                                            <span style="color: brown; font-style: italic;">
                                                <xsl:value-of select="text()" />
                                            </span>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </table>
                        </td>
                    </xsl:if>
                </tr>
            </table>
        </xsl:if>
    </p>
</xsl:template>



</xsl:stylesheet>
