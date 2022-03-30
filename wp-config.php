<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'sebpo_inventory' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'bLwJvfaOG^y (l^3]r>a$p@B0R./RWTOQ&0E~|Y|@tF Q[cttH.S]QZPUS(aKQF?' );
define( 'SECURE_AUTH_KEY',  '^0&0&EHoA~%P )BBH<w!+,IDZY1R/x}/*iv1 bj[;$^#m#QQTVWQ,M!I8Az^irz>' );
define( 'LOGGED_IN_KEY',    '4er{:8#ns|_k7:ugw?Wy/7h2?CcAeuOw%OwBu7ASUb4>U|$hrrc+U;{OM MLVh--' );
define( 'NONCE_KEY',        'kx;S09B>c;&rda$!6m%?`8kWbpi3#a8oOPQ4mJ&[wi&mj0[NgL H:OQTQ~s(N4OM' );
define( 'AUTH_SALT',        'JD61bhE vexGp>7_dzKQJI4n336CD+;%z<KWN$&^[LV6,dlRiu7)Q+]fs2DXCcS3' );
define( 'SECURE_AUTH_SALT', '8E`&LsA2.P%m)OAmzU<o/Ae)Z&y^4e`*}Mf{9br$_;=9mp@s@$2A]%9{$~y{_C7R' );
define( 'LOGGED_IN_SALT',   ' A/[ST8Y]?7K.r)9ER~+N)`/+!(7}*ag~D4Jd4e^hz^=_})6aZD44)Qbq GXBoei' );
define( 'NONCE_SALT',       '</vSr|o*?IZ/xGMc.c89&wuqCO2KGwyE;>K6nxIf=M2a.Z<*qSB6cZ=+7$>-M?mA' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

/** by-pass FTP credentials  */
define( 'FS_METHOD', 'direct' );
