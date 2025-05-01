import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
actor {
  public query func login(username : Text) : async Text {
    // let callerId = Principal.toText(msg.caller());
    return "Hello, " # username # "!";
  };
};
