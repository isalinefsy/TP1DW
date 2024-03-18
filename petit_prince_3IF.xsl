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
         <h1 style="text-align:center; color:blue;">LePetitPrince</h1>
    <xsl:apply-templates select = "//author"/>
    <xsl:apply-templates select = "//styling_information"/>
    <xsl:apply-templates select = "//image"/>
    <p>
    <xsl:apply-templates select = "//paragraph"/>
    </p>
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
    email : <xsl:value-of select="email/text()"/>
    </blockquote>
    <hr/>
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

<xsl:template match="paragraph">
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
    
</xsl:template>


</xsl:stylesheet>