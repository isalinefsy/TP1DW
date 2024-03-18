<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="code"/>
	
	<xsl:template match="/">
		<HTML>
			<BODY bgcolor="#FFFFCC">
				<H1>Selected country</H1>
				<element_a_recuperer>
					<ul><!-- on cherche les références bibliographiques dont la balise contient la valeur du paramètre-->
						<xsl:apply-templates select="//country_codes/*[contains(local-name(),$code)]/../.."/>
					</ul>
				</element_a_recuperer>
			</BODY>
		</HTML>
	</xsl:template>
	<xsl:template match="country">
		<LI>
			<xsl:value-of select="offic_name"/>:
    	    <xsl:value-of select="capital"/>.     
  		</LI>
	</xsl:template>
</xsl:stylesheet>
