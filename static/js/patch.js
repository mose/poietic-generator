/******************************************************************************/
/*                                                                            */
/*  Poetic Generator Reloaded is a multiplayer and collaborative art          */
/*  experience.                                                               */
/*                                                                            */
/*  Copyright (C) 2011 - Gnuside                                              */
/*                                                                            */
/*  This program is free software: you can redistribute it and/or modify it   */
/*  under the terms of the GNU Affero General Public License as published by  */
/*  the Free Software Foundation, either version 3 of the License, or (at     */
/*  your option) any later version.                                           */
/*                                                                            */
/*  This program is distributed in the hope that it will be useful, but       */
/*  WITHOUT ANY WARRANTY; without even the implied warranty of                */
/*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero  */
/*  General Public License for more details.                                  */
/*                                                                            */
/*  You should have received a copy of the GNU Affero General Public License  */
/*  along with this program.  If not, see <http://www.gnu.org/licenses/>.     */
/*                                                                            */
/******************************************************************************/

var PATCH_LIFESPAN = 500;

/*
function PatchQueue() {
}
*/

function Patch() {
	var self = this;
	var color = null;
	var changes = [];

	this.set_color = function( new_color ) {
		color = new_color;
	};

	this.append = function( pos ) {
		console.log( "patch.append: %s", JSON.stringify( pos ) );
		changes = changes.concat( [ pos.x, pos.y ] );
	};

	this.to_json = function() {
		return { 
			'color': color,
			'changes': changes,
		};	
	};

	this.from_json = function( patch ) {
		color = patch.color;
		changes = patch.changes;
	};

}

