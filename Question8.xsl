<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:param name="code"/>
    
    <xsl:template match="/">
        <HTML>
            <BODY>
                <Pays>
                    <TABLE border="1">
                        <TR>
                            <TH>Nom</TH>
                            <TH>Capital</TH>
                            <TH>Drapeaux</TH>
                            <TH>Language</TH>
                        </TR>
                        <xsl:apply-templates select="//country_codes/cca2[contains(.,$code)]/../.."/>
                    </TABLE>
                </Pays>
            </BODY>
        </HTML>
    </xsl:template>
    
    <xsl:template match="country">
        <TR>
            <TD>
                <xsl:value-of select="country_name/offic_name"/>
            </TD>
            <TD>
                <xsl:value-of select="capital"/>
            </TD>
            <TD>
                <img src="http://www.geonames.org/flags/x/{translate(country_codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/> 
            </TD>
            <TD>
                <xsl:for-each select="languages/*">
                    <xsl:value-of select="."/>
                    <xsl:if test="not(position() = last())">,
                    </xsl:if>
                </xsl:for-each>
            </TD>
        </TR>
    </xsl:template>
</xsl:stylesheet>
