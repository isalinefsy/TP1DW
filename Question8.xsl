<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="code"/>
	
	<xsl:template match="/">
		<HTML>
			<BODY bgcolor="#FFFFCC">
				<H1>Country</H1>
				<Pays>
					<ul><!-- on cherche les références bibliographiques dont la balise contient la valeur du paramètre-->
						<xsl:apply-templates select="//country_codes/cca2[contains(.,$code)]/../.."/>
					</ul>
				</Pays>
			</BODY>
		</HTML>
	</xsl:template>
	<xsl:template match="country">
        <LI>
			<xsl:value-of select="country_name/offic_name"/>:
    	    <xsl:value-of select="capital"/>.     
            <xsl:value-of select="languages">
        </LI>
	</xsl:template>
</xsl:stylesheet>
