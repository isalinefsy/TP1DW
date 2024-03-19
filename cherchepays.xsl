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
						<xsl:apply-templates select="//country[contains(country_codes/cca2,$code)]"/>
					</ul>
				</Pays>	
					<xsl:apply-templates select="//country[languages/*=//country[contains(country_codes/cca2,$code)]/languages/*]/country_codes"/>
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="country">
		<LI>
			<xsl:value-of select="country_name/offic_name"/>:
    	    <xsl:value-of select="capital"/>.     
  		</LI>
    </xsl:template>
	<xsl:template match="country_codes">
		<GreenCountries>
			<xsl:value-of select="cca2"/>
		</GreenCountries>   
    </xsl:template>
</xsl:stylesheet>
